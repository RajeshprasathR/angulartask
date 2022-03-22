import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private api : ApiService, private router : ActivatedRoute, private route : Router) { }

  errormsg : any;
  successmsg : any;
  getparamid : any;
  age : any;
  showAge : any;
  show = false;
  createData:any;

  ngOnInit(): void 
  {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid)
    {
      this.api.getSingleData(this.getparamid).subscribe((res)=>{
      console.log(res,'res==>');
      this.userForm.patchValue({
        firstname: res.data[0].firstname,
        lastname: res.data[0].lastname,
        email: res.data[0].email,
        dob: res.data[0].dob,
        mobileno: res.data[0].mobileno
      });
    });
  }

}
  userForm = new FormGroup({
    'firstname': new FormControl('',Validators.required),
    'lastname': new FormControl('',Validators.required),
    'email': new FormControl('',[Validators.required,Validators.email]),
    'dob': new FormControl('',Validators.required),
    'mobileno': new FormControl('',[Validators.required,Validators.pattern("[0-9]{10}")])

  });
  get firstname(){
    return this.userForm.get('firstname');
  }
  get lastname(){
    return this.userForm.get('lastname');
  }
  get email(){
    return this.userForm.get('email');
  }
  get dob(){
    return this.userForm.get('dob');
  }
  get mobileno(){
    return this.userForm.get('mobileno');
  }

  userSubmit()
  {
    //if(window.confirm('Are sure you want to submit'))
    //{
      if(this.userForm.valid)
      {
        if(this.age)
        {
          const convertAge = new Date(this.age);
          const timeDiff = Math.abs(Date.now() - convertAge.getTime());
          this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
          if(this.showAge > 18)
           {
             console.log("YOUR AGE IS :",this.showAge,"Above 18");
             console.log(this.userForm.value);
             this.api.createData(this.userForm.value).subscribe((res)=>{
             console.log(res,'res==>');
             Swal.fire
             ({
               position:'top',
               icon:'success',
               title: 'Register successfully',
               showConfirmButton: false,
               timer: 1000
             })
             //this.successmsg = 'registeration successful';
             this.userForm.reset();
            });
           }
           else
             {
               this.show = true;
               console.log("YOUR AGE IS :",this.showAge,"Below 18");
               this.userForm.get('dob');
             }
        }
     // }
    } 
  }
    test()
    {
       this.show = false;
    }
    userUpdate()
    {
      console.log(this.userForm.value,'updatedform');
      if(this.userForm.valid)
      {
        if(this.age)
        {
          const convertAge = new Date(this.age);
          const timeDiff = Math.abs(Date.now() - convertAge.getTime());
          this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
          if(this.showAge > 18)
          {
            console.log("YOUR AGE IS :",this.showAge,"Above 18");
            console.log(this.userForm.value);
            this.api.updateData(this.userForm.value,this.getparamid)
            .subscribe((res)=>{
            console.log(res,'resupdated');
            Swal.fire
            ({
              position:'top',
              icon:'success',
              title: 'Updated Successfully !',
              showConfirmButton: false,
              timer: 1000
            })
            this.userForm.reset();
            this.route.navigate(['/read']);
          });
        }
        else
        {
          this.show = true;
          console.log("YOUR AGE IS :",this.showAge,"Below 18");
          this.userForm.get('dob');
        }
      }
    }
  }
}
