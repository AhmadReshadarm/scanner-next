const handleHover = (isHover, setHover) => {
  setHover(isHover ? false : true);
};

const handleEdit = (ref, setActive) => {
  setActive('settings');
  ref.current.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'start',
  });
};

export { handleHover, handleEdit };
