import './cell-list.css';
import { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import CellListItem from '../Cell-List-Item/cell-list-item';
import AddCell from '../Add-Cell/add-cell';
import { useActions } from '../../hooks/use-actions';

//responsible for rendering list of cells onto the screen
const CellList: React.FC = () => {
  const cells = useTypedSelector(
    (
      { cells: { order, data } } //This is a selector
    ) => order.map((id) => data[id]) //idlere bakıp istenilenileni döndürüyoruz
  );

  const { fetchCells ,saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  // useEffect(() => {
  //   saveCells();
  // }, []);// [JSON.stringify(cells)] would work but it also would make a req to api with every keypress/ changes , NOT IDEAL!!
  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
