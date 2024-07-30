import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService);
  const router = inject(Router);
  if(authService.userId){
    return true;
  }
  else {
    return router.navigateByUrl('/login');
  }
};
