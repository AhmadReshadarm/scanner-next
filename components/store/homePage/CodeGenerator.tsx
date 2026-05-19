import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { createScanner, fetchScanners } from 'redux/slicers/scannerSlicer';
import { Button, InputNumber, Input, Checkbox, Progress, Select } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import { ScannerResponse } from 'swagger/services';

const { Option } = Select;

const CodeGenerator: React.FC = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.tags);

  // Generation settings
  const [amount, setAmount] = useState<number>(1);
  const [hasPrefix, setHasPrefix] = useState(false);
  const [prefix, setPrefix] = useState('');
  const [length, setLength] = useState<number>(16);

  // Character set options
  const [useLetters, setUseLetters] = useState(false);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecial, setUseSpecial] = useState(false);

  // Single tag selection (stores tag ID)
  const [selectedTagId, setSelectedTagId] = useState<string | undefined>(
    undefined,
  );

  // Generation state
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Cache for existing QR codes per tag URL – survives re‑renders
  const existingCodesCache = useRef<Map<string, Set<string>>>(new Map());

  // Build character set from current options
  const getCharacterSet = (): string => {
    let chars = '';
    if (useLetters)
      chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSpecial) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    return chars;
  };

  const generateRandomCode = (chars: string, len: number): string => {
    let result = '';
    const charsLength = chars.length;
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return result;
  };

  /**
   * Fetches all existing QR codes for a given tag URL and caches them.
   * If already cached, returns the cached set immediately.
   */
  const getExistingCodesForTag = async (
    tagUrl: string,
  ): Promise<Set<string>> => {
    const cache = existingCodesCache.current;
    if (cache.has(tagUrl)) {
      return cache.get(tagUrl)!;
    }

    // Fetch from server (only once per tag)
    try {
      const response: ScannerResponse = await dispatch(
        fetchScanners({
          limit: 1000000,
          offset: 0,
          tags: [tagUrl],
        }),
      ).then(unwrapResult);

      const codes = new Set<string>();
      if (response.rows) {
        for (const scanner of response.rows) {
          if (scanner.qrCode) {
            codes.add(scanner.qrCode);
          }
        }
      }
      cache.set(tagUrl, codes);
      return codes;
    } catch (error) {
      console.error(
        'Failed to fetch existing codes, generating without duplicate check.',
        error,
      );
      // Return empty set on failure, allowing generation (duplicates possible)
      return new Set<string>();
    }
  };

  const handleGenerate = async () => {
    const charSet = getCharacterSet();
    if (charSet.length === 0) {
      alert('Выберите хотя бы один тип символов (буквы, цифры или знаки).');
      return;
    }
    if (amount <= 0) return;
    if (!selectedTagId) {
      alert('Пожалуйста, выберите базу данных (тег).');
      return;
    }

    // Get the tag's URL from the selected ID
    const selectedTag = tags.find((tag) => tag.id == selectedTagId);
    if (!selectedTag || !selectedTag.url) {
      alert('Не удалось найти URL выбранного тега.');
      return;
    }
    const tagUrl = selectedTag.url;

    setGenerating(true);
    setProgress(0);

    // Retrieve (or fetch) the set of already existing codes for this tag
    const existingCodes = await getExistingCodesForTag(tagUrl);

    const localGenerated = new Set<string>();
    const newEntries: { qrCode: string; barCode: string }[] = [];

    // Calculate maximum possible unique codes
    const maxPossible = Math.pow(charSet.length, length);
    if (amount > maxPossible - existingCodes.size) {
      alert(
        `Невозможно сгенерировать ${amount} уникальных кодов. ` +
          `Доступное пространство: ${maxPossible}, уже существует: ${existingCodes.size}.`,
      );
      setGenerating(false);
      return;
    }

    // Generate unique codes
    let attempts = 0;
    const maxAttempts = amount * 100;
    while (newEntries.length < amount && attempts < maxAttempts) {
      const rawCode = generateRandomCode(charSet, length);
      const finalCode = hasPrefix ? prefix + rawCode : rawCode;

      if (!existingCodes.has(finalCode) && !localGenerated.has(finalCode)) {
        localGenerated.add(finalCode);
        newEntries.push({ qrCode: finalCode, barCode: rawCode });
      }
      attempts++;
    }

    if (newEntries.length < amount) {
      alert(
        `Удалось сгенерировать только ${newEntries.length} из ${amount} уникальных кодов. ` +
          `Попробуйте увеличить длину кода или расширить набор символов.`,
      );
    }

    // Save the new codes and update the cache
    for (let i = 0; i < newEntries.length; i++) {
      const { qrCode, barCode } = newEntries[i];
      const payload: any = {
        id: '',
        qrCode,
        barCode,
        tags: [selectedTagId],
      };

      try {
        await dispatch(createScanner(payload));
        // Only now add to the cache – on success
        existingCodes.add(qrCode);
      } catch (error) {
        console.error('Ошибка при сохранении кода', qrCode, error);
      }
      setProgress(Math.round(((i + 1) / newEntries.length) * 100));
    }

    setGenerating(false);
    // Refresh the scanner list for this tag
    dispatch(fetchScanners({ limit: 12, offset: 0, tags: [tagUrl] }));
  };

  return (
    <div
      style={{
        margin: '20px 0',
        padding: '15px',
        border: '1px solid #d9d9d9',
        borderRadius: '8px',
      }}
    >
      <h3>Генератор случайных кодов</h3>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: '15px',
        }}
      >
        <div>
          <span>Количество: </span>
          <InputNumber
            min={1}
            max={1000000000000000}
            value={amount}
            onChange={(val) => setAmount(val || 1)}
            disabled={generating}
          />
        </div>
        <div>
          <span>Длина кода: </span>
          <InputNumber
            min={1}
            max={100}
            value={length}
            onChange={(val) => setLength(val || 16)}
            disabled={generating}
          />
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <Checkbox
          checked={hasPrefix}
          onChange={(e) => setHasPrefix(e.target.checked)}
          disabled={generating}
        >
          Добавить префикс
        </Checkbox>
        {hasPrefix && (
          <Input
            style={{ width: 200, marginLeft: 10 }}
            placeholder="Введите префикс"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            disabled={generating}
          />
        )}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <span>Символы для кода: </span>
        <Checkbox
          checked={useLetters}
          onChange={(e) => setUseLetters(e.target.checked)}
          disabled={generating}
        >
          Буквы (A-Z, a-z)
        </Checkbox>
        <Checkbox
          checked={useNumbers}
          onChange={(e) => setUseNumbers(e.target.checked)}
          disabled={generating}
        >
          Цифры (0-9)
        </Checkbox>
        <Checkbox
          checked={useSpecial}
          onChange={(e) => setUseSpecial(e.target.checked)}
          disabled={generating}
        >
          Спец. знаки (!@#$%^&*...)
        </Checkbox>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <span>Выберите базу данных: </span>
        <Select
          style={{ minWidth: 300 }}
          placeholder="Выберите базу данных"
          value={selectedTagId}
          onChange={(value) => setSelectedTagId(value)}
          disabled={generating}
        >
          {tags.map((tag) => (
            <Option key={tag.id} value={tag.id}>
              {tag.name}
            </Option>
          ))}
        </Select>
      </div>

      <Button
        type="primary"
        onClick={handleGenerate}
        loading={generating}
        disabled={generating}
      >
        {generating ? `Генерация ${progress}%` : 'Сгенерировать коды'}
      </Button>

      {generating && (
        <Progress
          percent={progress}
          status="active"
          style={{ marginTop: '10px' }}
        />
      )}
    </div>
  );
};

export default CodeGenerator;
