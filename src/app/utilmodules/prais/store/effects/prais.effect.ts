import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { PraisService } from '../services/prais.service';
import { PraisInterface } from '../../../../interfaces/prais.interface';
// import { PersistanceService } from "../../../../services/persistence.service";
import {
  praisActionSuccess,
  praisActionFailed,
  praisAction
} from '../actions/action';

@Injectable()
export class PraisEffect {
  constructor(
    private actions$: Actions,
    private praisService: PraisService
  ) {}

  prais$ = createEffect(() =>
    this.actions$.pipe(
      ofType(praisAction),
      switchMap(() => {
        return this.praisService.getPrais().pipe(
          map((prais: PraisInterface[]) =>
            praisActionSuccess({ prais })
          ),
          catchError(() => of(praisActionFailed()))
        );
      })
    )
  );
}
