import { createActionGroup, props } from "@ngrx/store";

export const dishActions = createActionGroup({
    source: 'Dishes',
    events: {
        'Rate Dish': props<{ dishId: string; rating: number }>(),
        'Rate Dish Success': props<{ message: string }>(),
        'Rate Dish Failure': props<{ error: string }>(),
    }
})
