import { useState } from 'react';

export default function useSelectBox(box) {
  const [list, setList] = useState(box || []);
  const [listName, setListName] = useState('');

  const filterLists = value => {
    let filterData =
      list && setList?.length > 0
        ? list?.filter(data =>
            data?.doc?.toLowerCase()?.includes(value?.toLowerCase())
          )
        : [];
    setList([...filterData]);
  };

  const onDocSelected = value => {
    setListName(value);
    setList([]);
  };

  return {
    listName,
    setListName,
    filterLists,
    list,
    setList,
    onDocSelected
  };
}
