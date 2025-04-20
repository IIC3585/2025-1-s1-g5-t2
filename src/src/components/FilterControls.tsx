interface FilterControlsProps {
    selectedFilter: string;
    sigma: number;
    onFilterChange: (filter: string) => void;
    onSigmaChange: (value: number) => void;
    onApply: () => void;
    onSave: () => void;
  }
  
  const FilterControls = ({
    selectedFilter,
    sigma,
    onFilterChange,
    onSigmaChange,
    onApply,
    onSave
  }: FilterControlsProps) => {
    return (
      <div className="controls">
        <h3>Filters</h3>
        <select
          value={selectedFilter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="none">No Filter</option>
          <option value="blur">Blur</option>
          <option value="grayscale">Grayscale</option>
          <option value="invert">Invert Colors</option>
          <option value="brighten">Brighten</option>
          <option value="flip_horizontal">Flip Horizontal</option>
          <option value="flip_vertical">Flip Vertical</option>
        </select>
  
        {selectedFilter === 'blur' && (
          <div className="sigma-control">
            <label>Blur Intensity: {sigma}</label>
            <input
              type="range"
              min="1"
              max="20"
              value={sigma}
              onChange={(e) => onSigmaChange(Number(e.target.value))}
            />
          </div>
        )}
  
        {selectedFilter === 'brighten' && (
          <div className="sigma-control">
            <label>Brightness: {sigma}</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={sigma}
              onChange={(e) => onSigmaChange(Number(e.target.value))}
            />
          </div>
        )}
  
        <button className="apply-button" onClick={onApply}>
          Apply Filter
        </button>
  
        <button className="save-button" onClick={onSave}>
          Save Image
        </button>
      </div>
    );
  };
  
  export default FilterControls;
  