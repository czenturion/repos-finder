import { TableColumnT } from '@/types/componetTypes'

export const columns: readonly TableColumnT[] = [
  {
    id: 'name',
    label: 'Название',
    sortable: true
  },
  {
    id: 'language',
    label: 'Язык',
    sortable: true
  },
  {
    id: 'forks',
    label: 'Число форков',
    type: 'number',
    sortable: true,
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'stars',
    label: 'Число звезд',
    sortable: true,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'updated',
    label: 'Дата обновления',
    sortable: true,
    align: 'right',
    format: (value: number) => value.toFixed(2)
  }
]