import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addsell-item',
  templateUrl: './addsell-item.component.html',
  styleUrls: ['./addsell-item.component.css']
})
export class AddsellItemComponent implements OnInit {
  addItemForm!:FormGroup
  categoryList: any;
  itemId: any;
  itemList: any;
  constructor( private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.itemId = +this.itemId-1;
    this.categoryList= JSON.parse(localStorage.getItem('category') || '[]');
    
    console.log(this.categoryList[this.itemId].items)
    if(!this.categoryList.length){
      this.itemList=[]
    }else{
      this.itemList = this.categoryList[this.itemId].items;
    }

    this.addItemForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      image: ['']
    })
  }

  onSubmit(){
    this.itemList.push({
      p_id: 0,
      p_name: this.addItemForm.controls.name.value,
      p_price: this.addItemForm.controls.price.value,
      p_desc: this.addItemForm.controls.desc.value,
      p_img: "https://miro.medium.com/max/9968/1*2fAtste9D54C_0NgIBJbuA.jpeg"
    });
    console.log(this.itemList);
    console.log(this.categoryList);
    localStorage.setItem('category',JSON.stringify(this.categoryList));
    this.addItemForm.reset();
    let close = document.getElementById('close');
    close?.click();

  }
}
