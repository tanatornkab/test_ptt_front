import { Routes } from '@angular/router';
import { RouteURL } from './shared/enum/route.enum';
import { PicturesViewGuard } from './shared/services/pictures-view-guard';

export const routes: Routes = [

    {
		path: RouteURL.picutresView,
		loadComponent: () => import("./pictures-view/pictures-view.component").then((c) => c.PicturesViewComponent),
	},
    {
		path: RouteURL.picutresAdd,
        canActivate: [PicturesViewGuard],
		loadComponent: () => import("./pictures-add/pictures-add.component").then((c) => c.PicturesAddComponent),
	},
    { path:"**" , redirectTo:RouteURL.picutresView}
];
