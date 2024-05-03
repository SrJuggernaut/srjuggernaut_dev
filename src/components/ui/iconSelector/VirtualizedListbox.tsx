import { HTMLAttributes, ReactElement, forwardRef, useEffect, useState } from 'react'
import { ListChildComponentProps, VariableSizeList } from 'react-window'

export interface VirtualizedListboxProps extends HTMLAttributes<HTMLUListElement> {
}

const VirtualizedListbox = forwardRef<HTMLUListElement, VirtualizedListboxProps>(({ children, ...restProps }, ref) => {
  const [childrenElements, setChildrenElements] = useState<ReactElement[]>([])

  useEffect(() => {
    const itemData: ReactElement[] = [];
    (children as ReactElement[]).forEach(
      (item: ReactElement & { children?: ReactElement[] }) => {
        itemData.push(item)
        itemData.push(...(item.children || []))
      }
    )
    setChildrenElements(itemData)
  }, [children])

  return (
    <ul
      ref={ref}
      style={{ position: 'relative', height: 'auto' }}
      {...restProps}
    >
      <VariableSizeList
        itemData={childrenElements}
        height={(Math.min(6, childrenElements.length) * 48)}
        width="100%"
        itemCount={childrenElements.length}
        itemSize={() => 48}
        overscanCount={2}
      >
        {({ data, index, style }:ListChildComponentProps) => <div style={style}>{data[index]}</div>}
      </VariableSizeList>
    </ul>
  )
})

VirtualizedListbox.displayName = 'VirtualizedListbox'

export default VirtualizedListbox
