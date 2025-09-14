import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthError, selectAuthLoading, selectAuthMessage } from '../../../store/auth/auth.selectors';
import { AuthActions } from '../../../store/auth/auth.actions';
@Component({
  selector: 'app-verify-email-page',
  imports: [RouterModule],
  templateUrl: './verify-email-page.html',
  styleUrl: './verify-email-page.css'
})
export class VerifyEmailPage implements OnInit  {
  private readonly route = inject(ActivatedRoute);
  private readonly store  = inject(Store);

  readonly isLoading = this.store.selectSignal(selectAuthLoading);
  readonly message = this.store.selectSignal(selectAuthMessage);
  readonly error = this.store.selectSignal(selectAuthError);

  ngOnInit(): void {
      const token = this.route.snapshot.queryParamMap.get('token');
      if(token) {
        this.store.dispatch(AuthActions.verifyEmail({token}))
      }
  }


}


