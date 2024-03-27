import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { PicturesService } from './pictures-view.service';
import { PictureModel } from './pictures.model';
import { Router } from '@angular/router';
import { RouteURL } from '../shared/enum/route.enum';
import { Subject, Subscription, debounceTime, distinctUntilChanged, firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PicturesViewGuard } from '../shared/services/pictures-view-guard';
@Component({
  selector: 'app-pictures-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pictures-view.component.html',
  styleUrl: './pictures-view.component.scss',
  providers:[PicturesService]
})
export class PicturesViewComponent implements OnInit,OnDestroy {
  pictures =signal<PictureModel[]>([])

  constructor(private picturesService :PicturesService,private picturesViewGuard :PicturesViewGuard,private router :Router){
  }
  ngOnInit(): void {
    this.loadPictures();
    
  }

  ngOnDestroy(): void {
    this.picture$?.unsubscribe();
    
  }
  keywork:string='';
  timeout:any
  search(event:any){
    clearInterval(this.timeout)
    this.timeout = setTimeout(()=>{
      this.loadPictures(event);
    },500)
  }

  searchTerms = new Subject<string>();
  picture$: Subscription = new Subscription;
  loadPictures(keyword:string = ""){
    this.picture$?.unsubscribe();
    this.picture$ = this.picturesService.getPictures(keyword).pipe(
      debounceTime(500), // Delay by 500 milliseconds
      distinctUntilChanged() 
      
    ).subscribe({
      next:res=>{
        this.pictures.set(res.data)
      }
    })
  }

  addPicture(){
    this.picturesViewGuard.markPicturesViewVisited();
    this.router.navigate([RouteURL.picutresAdd])
  }
}

