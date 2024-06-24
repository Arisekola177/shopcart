
'use client';

const SetColor = ({ handleColorClick, productImages }) => {
  return (
    <div>
      <div className="flex max-w-[200px] rounded-md bg-slate-300 items-center gap-3 mt-4 border-[1px] border-gray-500 p-2">
        <span className="font-semibold text-sm">COLOR: </span>
        {productImages.map((image, index) => (
          <div
            key={index}
            onClick={() => handleColorClick(image.image, image.color, image.colorCode)}
            style={{ backgroundColor: image.colorCode, width: '20px', height: '20px', borderRadius: '50%', cursor: 'pointer' }}
            className="hover:scale-110 duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default SetColor;
