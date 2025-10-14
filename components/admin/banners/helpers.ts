import { navigateTo } from 'common/helpers';
import { NextRouter } from 'next/router';
import { updateAdvertisement, updateSlides } from 'redux/slicers/bannersSlicer';
import { AppDispatch } from 'redux/store';
import { Page } from 'routes/constants';

const handleGetSlideImage = (slideNum, images) => {
  return images.find((image) => image.uid === slideNum)?.name;
};

const handleSlidesDataFormatter = (form, images) => {
  const result = Object.values(form).reduce((accum: any[], link, index) => {
    return accum.concat({
      image: handleGetSlideImage(index + 1, images),
      link,
    });
  }, []);

  return result;
};

export const handleFormSubmitBanner =
  (
    router: NextRouter,
    dispatch: AppDispatch,
    image: any,
    bannerIs: string,
    id?: number,
  ) =>
  async (form) => {
    let isSaved: any;
    switch (bannerIs) {
      case 'advertisement':
        if (typeof form.description !== 'string') {
          form = {
            ...form,
            description: JSON.stringify(form.description),
          };
        }

        isSaved = await dispatch(
          updateAdvertisement({
            ...form,
            id,
          }),
        );
        break;
      case 'slides':
        const slidesData = await handleSlidesDataFormatter(form, image);
        isSaved = dispatch(updateSlides(slidesData));
        break;
    }
    if (!isSaved.error) {
      navigateTo(router, Page.ADMIN_BANNERS)();
    }
  };
// let counter = 0;
// const handleSlideDataUpload = async (slidesData, dispatch) => {
//   if (slidesData.length > counter) {

//     await dispatch(updateSlides(slidesData[counter]));
//     handleSlideDataUpload(slidesData, dispatch);
//     counter++;
//   }
// };
export const handleGetImage = (
  uid: number,
  imageList,
):
  | {
      name: string;
      url: string;
      uid: string;
    }[]
  | [] => {
  const image = imageList.filter((image) => image.uid === uid);
  if (image) {
    return image;
  }
  return [];
};

export const editorLabels = {
  // Generic
  'generic.add': 'Add',
  'generic.cancel': 'Cancel',

  // BlockType
  'components.controls.blocktype.h1': 'Heading 1',
  'components.controls.blocktype.h2': 'Heading 2',
  'components.controls.blocktype.h3': 'Heading 3',
  'components.controls.blocktype.h4': 'Heading 4',
  'components.controls.blocktype.h5': 'Heading 5',
  'components.controls.blocktype.h6': 'Heading 6',
  'components.controls.blocktype.blockquote': 'Blockquote',
  'components.controls.blocktype.code': 'Code',
  'components.controls.blocktype.blocktype': 'Block Type',
  'components.controls.blocktype.normal': 'Normal',

  // Color Picker
  'components.controls.colorpicker.colorpicker': 'Color Picker',
  'components.controls.colorpicker.text': 'Text',
  'components.controls.colorpicker.background': 'Highlight',

  // Embedded
  'components.controls.embedded.embedded': 'Embedded',
  'components.controls.embedded.embeddedlink': 'Embedded Link',
  'components.controls.embedded.enterlink': 'Enter link',

  // Emoji
  'components.controls.emoji.emoji': 'Emoji',

  // FontFamily
  'components.controls.fontfamily.fontfamily': 'Font',

  // FontSize
  'components.controls.fontsize.fontsize': 'Font Size',

  // History
  'components.controls.history.history': 'History',
  'components.controls.history.undo': 'Undo',
  'components.controls.history.redo': 'Redo',

  // Image
  'components.controls.image.image': 'Image',
  'components.controls.image.fileUpload': 'File Upload',
  'components.controls.image.byURL': 'URL',
  'components.controls.image.dropFileText': 'Drop the file or click to upload',

  // Inline
  'components.controls.inline.bold': 'Bold',
  'components.controls.inline.italic': 'Italic',
  'components.controls.inline.underline': 'Underline',
  'components.controls.inline.strikethrough': 'Strikethrough',
  'components.controls.inline.monospace': 'Monospace',
  'components.controls.inline.superscript': 'Superscript',
  'components.controls.inline.subscript': 'Subscript',

  // Link
  'components.controls.link.linkTitle': 'Link Title',
  'components.controls.link.linkTarget': 'Link Target',
  'components.controls.link.linkTargetOption': 'Open link in new window',
  'components.controls.link.link': 'Link',
  'components.controls.link.unlink': 'Unlink',

  // List
  'components.controls.list.list': 'List',
  'components.controls.list.unordered': 'Unordered',
  'components.controls.list.ordered': 'Ordered',
  'components.controls.list.indent': 'Indent',
  'components.controls.list.outdent': 'Outdent',

  // Remove
  'components.controls.remove.remove': 'Remove',

  // TextAlign
  'components.controls.textalign.textalign': 'Text Align',
  'components.controls.textalign.left': 'Left',
  'components.controls.textalign.center': 'Center',
  'components.controls.textalign.right': 'Right',
  'components.controls.textalign.justify': 'Justify',
};

export const handleCheckFalsyValues = (
  imageList,
  link1,
  link2,
  link3,
  link4,
  link5,
): boolean => {
  return (
    imageList.length !== 5 || !link1 || !link2 || !link3 || !link4 || !link5
  );
};
