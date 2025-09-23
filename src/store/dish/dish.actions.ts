import { createActionGroup, props } from "@ngrx/store";
import { Dish } from "../../models";

export const dishActions = createActionGroup({
    source: 'Dishes',
    events: {
        'Rate Dish': props<{ dishId: string; rating: number }>(),
        'Rate Dish Success': props<{ message: string }>(),
        'Rate Dish Failure': props<{ error: string }>(),
        'Load Most Popular Dishes': props<{ limit?: number }>(),
        'Load Most Popular Dishes Success': props<{ dishes: Dish[] }>(),
        'Load Most Popular Dishes Failure': props<{ error: string }>(),
    }
})
