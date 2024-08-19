export type SearchReposInputT = {

}

export interface TableColumnT {
  id: 'name' | 'language' | 'forks' | 'stars' | 'updated'
  label: string
  minWidth?: number
  sortable?: boolean
  type?: 'number'
  align?: 'right'
  format?: (value: number) => string
}

export type ResultTablePropsT = {
}


