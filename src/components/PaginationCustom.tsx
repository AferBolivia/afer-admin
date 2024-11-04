import { useState } from "react"

import { CaretLeft, CaretRight, DotsThree } from "@phosphor-icons/react"
import { Pagination, PaginationItem, PaginationList, PaginationNavigator } from "keep-react"


const PaginationCustom = ({
  pageCount = 0,
  selectedPage = 0,
  onPageChange = () => {},
}: PaginationCustomProps) => {
  const [currentPage, setCurrentPage] = useState(selectedPage)
  const firstPage = 1
  const lastPage = pageCount

  if (pageCount <= 0 || selectedPage <= 0) {
    return <span />
  }

  const handleClickEvent = (selectedPageIndex: number) => {
    if (window) {
      window.scrollTo(0, 0)
    }
    onPageChange(selectedPageIndex)
  }

  const navigateBarEvent = (indexNavigate: number) => {
    if (indexNavigate >= firstPage && indexNavigate <= lastPage) {
      setCurrentPage(indexNavigate)
    }
  }

  const buildArraySpacesForward = (indexPage: number): number[] => {
    const arraySpaces: number[] = []
    const partialEnd = indexPage + 2
    const endPage = partialEnd <= lastPage ? partialEnd : lastPage
    for (let index = indexPage; index <= endPage; index += 1) {
      arraySpaces.push(index)
    }
    return arraySpaces
  }

  const buildArraySpacesBack = (indexPage: number): number[] => {
    const arraySpaces: number[] = []
    const partialEnd = indexPage - 2
    const endPage = partialEnd >= firstPage ? partialEnd : firstPage
    for (let index = endPage; index <= indexPage; index += 1) {
      arraySpaces.push(index)
    }
    return arraySpaces
  }

  const buildArraySpacesMiddle = (indexPage: number): number[] => {
    const arraySpaces: number[] = []
    const partialEnd = indexPage + 1
    const partialStart = indexPage - 1
    const startPage = partialStart >= firstPage ? partialStart : firstPage
    const endPage = partialEnd <= lastPage ? partialEnd : lastPage
    for (let index = startPage; index <= endPage; index += 1) {
      arraySpaces.push(index)
    }
    return arraySpaces
  }

  const buildButtons = (arrayList: number[]) => (
    <>
      {arrayList.map((page, index) => (
        // <Button
        //   appearance={`${page === selectedPage ? "primary" : "subtle"}`}
        //   key={`button${index}`}
        //   onClick={() => {
        //     handleClickEvent(page)
        //   }}
        //   style={{
        //     minWidth: "30px",
        //     background: page === selectedPage ? selectedBackColor : "",
        //     color: page === selectedPage ? selectedTextColor : "",
        //   }}
        // >
        //   {page}
        // </Button>
        <PaginationItem
          key={`button${index}`}
          onClick={() => {
            handleClickEvent(page)
          }}
          active={page === selectedPage}
        >
          {page}
        </PaginationItem>
      ))}
    </>
  )

  const buildMiddleButton = (indexPage: number) => {
    if (indexPage === 1) {
      return buildButtons(buildArraySpacesForward(indexPage))
    }
    if (indexPage === lastPage) {
      return buildButtons(buildArraySpacesBack(indexPage))
    }
    return buildButtons(buildArraySpacesMiddle(indexPage))
  }

  const backNavigateValidation = () => currentPage > 2 && lastPage > 3
  const nextNavigateValidation = () =>
    currentPage < lastPage - 1 && lastPage > 3

  return (
    <div className="flex justify-center items-center gap-2">
      <Pagination shape="circle">
        <PaginationNavigator
          shape="circle"
          disabled={selectedPage === firstPage}
          onClick={() => {
            handleClickEvent(selectedPage - 1)
          }}
        >
          <CaretLeft size={18} />
        </PaginationNavigator>
        <PaginationList>
          <PaginationItem
            disabled={!backNavigateValidation()}
            onClick={() => {
              navigateBarEvent(currentPage - 2)
            }}
          >
            <DotsThree size={20} />
          </PaginationItem>
          {buildMiddleButton(currentPage)}
          <PaginationItem
            disabled={!nextNavigateValidation()}
            onClick={() => {
              navigateBarEvent(currentPage + 2)
            }}
          >
            <DotsThree size={20} />
          </PaginationItem>
        </PaginationList>
        <PaginationNavigator
          shape="circle"
          disabled={selectedPage === lastPage}
          onClick={() => {
            handleClickEvent(selectedPage + 1)
          }}
        >
          <CaretRight size={18} />
        </PaginationNavigator>
      </Pagination>
    </div>
  )
}

type PaginationCustomProps = {
  pageCount: number
  selectedPage: number
  onPageChange: (index: number) => void
}


export default PaginationCustom
