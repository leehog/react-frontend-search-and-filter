//@flow
import React from 'react'

type Items = Array<*>

type Props = {
    items: Items,
    currentPage: number,
    itemsPerPage?: number
}

const defaultItemsPerPage = 18

export const Paginate = (props: Props): Items => {
    const { items } = props
    const itemsPerPage = props.itemsPerPage ? props.itemsPerPage : defaultItemsPerPage
    const currentPage = props.currentPage
    const nextPage = (currentPage * itemsPerPage)

    const firstIndex = currentPage === 1 ? 0 : (nextPage - itemsPerPage)
    const secondIndex = currentPage === 1 ? itemsPerPage : nextPage
    let newArray = items.slice(firstIndex, secondIndex)
    return newArray
}

export const evalPageCount = (array: Array<*>, itemsPerPage?: number) => {
    const maxItems = itemsPerPage ? itemsPerPage : defaultItemsPerPage
    const pageCount = parseInt((array.length / maxItems) - 0.5)
    let pageCountArray = []
    for(let i = 0; i <= pageCount; i++) {
        pageCountArray = [...pageCountArray, (i + 1)]
    }
    return pageCountArray
}