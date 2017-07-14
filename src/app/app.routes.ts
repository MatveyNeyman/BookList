import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookList, LayoutExercise, Home } from './exports';

export const AppRoutes: Routes = [
    {
        path: 'home',
        component: Home
    },
    {
        path: 'book-list',
        component: BookList
    },
    {
        path: 'layout-exercise',
        component: LayoutExercise
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: Home
    }
];