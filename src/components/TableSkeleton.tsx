import { Fragment } from "react"

import { Skeleton, SkeletonLine } from "keep-react"
import styled from "styled-components"

const WrapperRow = styled.div<{cols: number}>`
  display: grid;
  grid-template-columns: 40px repeat(${(props) => props.cols || 0}, 1fr);
  grid-template-rows: repeat(auto-fill, 35px);
  grid-row-gap: 0.3em;
  grid-column-gap: 0.6em;
  &.first {
    grid-template-columns: auto;
  }
`

const TableSkeleton = ({ rows = 0, cols = 0 }: TableSkeletonProps) => {
  const rowsIterator = Array(rows).fill(0)
  const colsIterator = Array(cols).fill(0)
  return (
    <div className="flex flex-col gap-2 w-full">
      {rowsIterator.map((_, indexRow) => (
        <Fragment key={`rowSkeleton${indexRow}`}>
          {indexRow === 0 && (
            <WrapperRow className="first" cols={cols - 1}>
              <Skeleton className="w-full space-y-2.5">
                <SkeletonLine className="h-8" />
              </Skeleton>
            </WrapperRow>
          )}
          <WrapperRow cols={cols - 1}>
            {colsIterator.map((__, indexCol) => (
              <Skeleton
                key={`colSkeleton${indexCol}`}
                className="w-full space-y-2.5"
              >
                <SkeletonLine className="h-8" />
              </Skeleton>
            ))}
          </WrapperRow>
          {indexRow === rows - 1 && (
            <WrapperRow cols={cols - 1}>
              <Skeleton
                style={{
                  gridColumnStart: 2,
                  gridColumnEnd: -2,
                }}
                className="w-full space-y-2.5"
              >
                <SkeletonLine className="h-8" />
              </Skeleton>
            </WrapperRow>
          )}
        </Fragment>
      ))}
    </div>
  )
}

type TableSkeletonProps = {
  rows?: number
  cols?: number
}

export default TableSkeleton
