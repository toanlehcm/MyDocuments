'use client'
import { useState, useMemo } from 'react'

interface UsePaginationProps {
    totalItems: number
    initialPageSize?: number
    initialPage?: number
}

interface UseTablePaginationReturn {
    currentPage: number
    pageSize: number
    totalPages: number
    startIndex: number
    endIndex: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    setPage: (page: number) => void
    setPageSize: (size: number) => void
    nextPage: () => void
    previousPage: () => void
    reset: () => void
}

export function useTablePagination({
    totalItems,
    initialPageSize = 10,
    initialPage = 1
}: UsePaginationProps): UseTablePaginationReturn {
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [pageSize, setPageSize] = useState(initialPageSize)

    const totalPages = useMemo(() => {
        return Math.ceil(totalItems / pageSize)
    }, [totalItems, pageSize])

    const startIndex = useMemo(() => {
        return (currentPage - 1) * pageSize
    }, [currentPage, pageSize])

    const endIndex = useMemo(() => {
        return Math.min(startIndex + pageSize - 1, totalItems - 1)
    }, [startIndex, pageSize, totalItems])

    const hasNextPage = currentPage < totalPages
    const hasPreviousPage = currentPage > 1

    const setPage = (page: number): void => {
        const validPage = Math.max(1, Math.min(page, totalPages))
        setCurrentPage(validPage)
    }

    const handlePageSizeChange = (size: number): void => {
        setPageSize(size)
        // Reset to page 1 when page size changes
        setCurrentPage(1)
    }

    const nextPage = (): void => {
        if (hasNextPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const previousPage = (): void => {
        if (hasPreviousPage) {
            setCurrentPage(currentPage - 1)
        }
    }

    const reset = (): void => {
        setCurrentPage(initialPage)
        setPageSize(initialPageSize)
    }

    return {
        currentPage,
        pageSize,
        totalPages,
        startIndex,
        endIndex,
        hasNextPage,
        hasPreviousPage,
        setPage,
        setPageSize: handlePageSizeChange,
        nextPage,
        previousPage,
        reset
    }
}
