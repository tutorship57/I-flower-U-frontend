<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Colors</label>
    <div className="flex flex-wrap gap-2">
   
    {/* {data.colors.map(color => ( */}
        {colors.map(color => (
        <label key={color.color_id} className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
        <input
            type="checkbox"
            checked={selectedColors?.includes(color.color_id)}
            onChange={(e) => {
            const newColors = e.target.checked
                ? [...selectedColors, color.color_id]
                : selectedColors.filter((id: number) => id !== color.color_id);
            setSelectedColors(newColors);
            }}
            className="rounded text-pink-600"
        />
        <span className="text-sm">{color.color_name}</span>
        </label>
    ))}
    </div>
</div>

