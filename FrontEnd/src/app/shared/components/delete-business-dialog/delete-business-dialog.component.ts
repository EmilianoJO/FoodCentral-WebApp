import { Component,Inject,OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NegociosService } from '../../services/negocios.service';

@Component({
  selector: 'app-delete-business-dialog',
  templateUrl: './delete-business-dialog.component.html',
  styleUrls: ['./delete-business-dialog.component.scss']
})
export class DeleteBusinessDialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA ) public data:{id:any,name:any},
  private matDialogRef:MatDialogRef<DeleteBusinessDialogComponent>,private negocioService:NegociosService){


  }
  ngOnInit(): void{
    //alert(this.data);
  }
  ngOnDestroy(){
    this.matDialogRef.close(this.data);
  }
  onCloseClick(){
    this.matDialogRef.close();
  }
  onSaveClick(){
    this.negocioService.deleteNegocio(this.data.id).subscribe((response:any)=>{
      console.log(response);
    });
    
    this.matDialogRef.close();
  }

}
