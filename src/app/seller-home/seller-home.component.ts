import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  addCategryForm!: FormGroup;
  categoryList : any[] = [];
  id = 0;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.categoryList= JSON.parse(localStorage.getItem('category') || '[]');
    console.log(this.categoryList.length);
    if(!this.categoryList.length){
      this.id = 1;
    }else{
      this.id = this.categoryList[this.categoryList.length-1].id + 1;
    }

    this.addCategryForm = this.formBuilder.group({
      prod_cat:['']
    })
  }

  onSubmit(){
    let close = document.getElementById('close');
    console.log(this.categoryList)
    if(this.categoryList == []){
      let catName={
        id:this.id,
        cat_name:this.addCategryForm.controls.prod_cat.value,
        items:[]
      }
      this.categoryList.push(catName)
      localStorage.setItem('category',JSON.stringify(this.categoryList))
    }else{
      let catName={
        id:this.id,
        cat_name:this.addCategryForm.controls.prod_cat.value,
        items:[]
      }
      this.categoryList.push(catName)
      localStorage.setItem('category',JSON.stringify(this.categoryList))
    }
    
   
    close?.click();
    this.id++;
  }

  onCatItemClick(id: any){
    this.router.navigate(['/sell-item', id])
  }

}
