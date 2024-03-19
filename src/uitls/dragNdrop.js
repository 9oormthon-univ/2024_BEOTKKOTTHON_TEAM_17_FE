export const useDragAndDrop = (setAddedImages, setDragging, setDraggingIdx, canvasRef) => {
  const onMouseDown = (e, addedImages) => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    addedImages.forEach((img, idx) => {
      if (mouseX > img.x && mouseX < img.x + img.width && mouseY > img.y && mouseY < img.y + img.height) {
        setDragging(true);
        setDraggingIdx(idx);
      }
    });
  };

  const onMouseMove = (e, dragging, draggingIdx, addedImages) => {
    if (dragging) {
      window.requestAnimationFrame(() => {
        const mouseX = e.nativeEvent.offsetX;
        const mouseY = e.nativeEvent.offsetY;
        setAddedImages(
          addedImages.map((img, idx) => {
            if (idx === draggingIdx) {
              return { ...img, x: mouseX - img.width / 2, y: mouseY - img.height / 2 };
            }
            return img;
          })
        );
      });
    }
  };

  const onMouseUp = (setDragging, setDraggingIdx) => {
    setDragging(false);
    setDraggingIdx(null);
  };

  //---- Touch event
  const onTouchStart = (e, addedImages) => {
    const touch = e.touches[0];
    const offsetX = touch.clientX - canvasRef.current.getBoundingClientRect().left;
    const offsetY = touch.clientY - canvasRef.current.getBoundingClientRect().top;
    addedImages.forEach((img, idx) => {
      if (offsetX > img.x && offsetX < img.x + img.width && offsetY > img.y && offsetY < img.y + img.height) {
        setDragging(true);
        setDraggingIdx(idx);
        e.preventDefault();
      }
    });
  };

  const onTouchMove = (e, dragging, draggingIdx, addedImages) => {
    if (dragging) {
      window.requestAnimationFrame(() => {
        const touch = e.touches[0];
        const offsetX = touch.clientX - canvasRef.current.getBoundingClientRect().left;
        const offsetY = touch.clientY - canvasRef.current.getBoundingClientRect().top;

        const newX = Math.min(
          Math.max(0, offsetX - addedImages[draggingIdx].width / 2),
          canvasRef.current.width - addedImages[draggingIdx].width
        );
        const newY = Math.min(
          Math.max(0, offsetY - addedImages[draggingIdx].height / 2),
          canvasRef.current.height - addedImages[draggingIdx].height
        );
        e.preventDefault();
        setAddedImages(
          addedImages.map((img, idx) => {
            if (idx === draggingIdx) {
              return { ...img, x: newX, y: newY };
            }
            return img;
          })
        );
      });
    }
  };

  const onTouchEnd = (setDragging, setDraggingIdx) => {
    setDragging(false);
    setDraggingIdx(null);
  };
  return { onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd };
};
