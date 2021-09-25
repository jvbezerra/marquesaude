import React from 'react'
import { FixedSizeList as VirtualList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import MuiList, { ListProps } from '@mui/material/List'

interface Props extends ListProps<any> {
  count: number,
  showing: number,
  renderItem: Function | any,
}

const List: React.FC<Props> = (props) => {
  const { count, showing, renderItem } = props

  return (
    <MuiList {...props}>
      <AutoSizer disableHeight style={{ width: '100%' }}>
        {(width: any) => (
          <VirtualList
            height={showing * 75}
            itemCount={count}
            itemSize={75}
            width={width}
          >
            {renderItem}
          </VirtualList>
        )}
      </AutoSizer>
    </MuiList>
  )
}

export default List