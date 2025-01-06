import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

type Props = {
  page: number
  pages: number
  onPageChange: (page:number) => void
}

const PaginationSelector = ({page, pages, onPageChange}: Props) => {
  const pageNumbers = []

  for(let i = 1; i <= pages; i++){
    pageNumbers.push(i)
    // The values are being looped and pushed into the array, depending on the total page count
  }

  return(
    <Pagination>
      <PaginationContent>
        { page !== 1 && (
          <PaginationItem>
            {/* href is # since we're still on the same page */}
            <PaginationPrevious href="#" onClick={() => onPageChange(page-1)}></PaginationPrevious>
          </PaginationItem>
        )}
    
        {/* These are all the pages, page is the current page while number is the looped page numbers  */}
        {pageNumbers.map((number) => (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => onPageChange(number)} isActive={page===number}>{number}</PaginationLink>
          </PaginationItem>
        ))}
        
        {page !== pageNumbers.length && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => onPageChange(page+1)}></PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationSelector;