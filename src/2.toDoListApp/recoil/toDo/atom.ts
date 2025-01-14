import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()
export const Categories = {
  TO_DO: 0,
  DOING: 1,
  DONE: 2
} as const

export type TCategories = (typeof Categories)[keyof typeof Categories]

/* export enum Categories {
    'TO_DO' = 'TO_DO',
    'DOING' = 'DOING',
    'DONE' = 'DONE'
  } */

export interface IToDo {
  text: string
  id: number
  category: TCategories
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects_UNSTABLE: [persistAtom]
})

export const categoryState = atom<TCategories>({
  key: 'category',
  default: Categories.TO_DO,
  effects_UNSTABLE: [persistAtom]
})

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState)
    const category = get(categoryState)
    return toDos.filter((toDo) => toDo.category === category)
  }
})
/* 
//toDoselector
return [toDos.filter((toDo) => toDo.category === 'TO_DO'),
       toDos.filter((toDo) => toDo.category === 'DOING'),
       toDos.filter((toDo) => toDo.category === 'DONE')] 
*/
