import { Component,Inject,OnInit  } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../../services/usuarios.service';


@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA ) public data:{id:any,name:any},
  private matDialogRef:MatDialogRef<DeleteUserDialogComponent>,
  private usuarioService:UsuariosService){

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
    this.usuarioService.deleteUsuario(this.data.id).subscribe((response:any)=>{
      console.log(response);
    });
    
    this.matDialogRef.close();
  }

}
