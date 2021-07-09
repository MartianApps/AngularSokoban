import { createAction, props } from '@ngrx/store';
import { Facing } from '../level';

export const movePlayer = createAction(
    '[Event Keyboard] Move',
    props<{ facing: Facing }>()
  );