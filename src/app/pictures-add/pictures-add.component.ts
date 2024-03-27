import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { RouteURL } from '../shared/enum/route.enum';
import { Router } from '@angular/router';
import { PicturesService } from '../pictures-view/pictures-view.service';

@Component({
  selector: 'app-pictures-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pictures-add.component.html',
  styleUrl: './pictures-add.component.scss'
})
export class PicturesAddComponent implements OnInit {
	form!: UntypedFormGroup;
		
  constructor(private fb: UntypedFormBuilder,private router :Router,private picturesService :PicturesService){
  }

  ngOnInit(): void {
    this.form = this.fb.group({
			title: new UntypedFormControl("", Validators.required), 
			pictureUrl: new UntypedFormControl("", Validators.required), 
		});
  }

  onSubmit(){
    this.form.markAllAsTouched();
    if(this.form.invalid) return
    this.isImageUrlByLoad(this.form.value.pictureUrl).then(res=>{
      console.log('res: ', res);
      if(res){
        this.picturesService.addPicture(this.form.value).subscribe({
          next:res=>{
            if(res.data.result){
              this.goToPictureView();
            }else{
              this.form.reset();
            }
          }
        })
      }else{
        this.form.reset();
      }
    })
  }

  isImageUrlByLoad(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = url;
    });
  }

  goToPictureView(){
    this.router.navigate([RouteURL.picutresView])
  }
}
