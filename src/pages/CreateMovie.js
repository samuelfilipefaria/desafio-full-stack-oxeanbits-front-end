import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { useState } from 'react';

export const CreateMovie = () => {
  const [selected, setSelected] = useState(1);
  const handleSelect = e => {
    setSelected(e.selected);
  };

  return (
    <TabStrip selected={selected} onSelect={handleSelect}>
      <TabStripTab title="Create a new movie">
        <p>A form here</p>
      </TabStripTab>
      <TabStripTab title="Create movie in bulk">
        <p>Another form here</p>
      </TabStripTab>
    </TabStrip>
  );
}
