import { Component } from '@angular/core';

import { Negocios } from 'src/app/shared/interfaces/negocios';
import { Usuarios } from 'src/app/shared/interfaces/usuarios';

import { NegociosService } from 'src/app/shared/services/negocios.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

import { MatDialog } from '@angular/material/dialog';
import { DeleteBusinessDialogComponent } from 'src/app/shared/components/delete-business-dialog/delete-business-dialog.component';
import { DeleteUserDialogComponent } from 'src/app/shared/components/delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent {
  

  negocios:Array<Negocios> = [];
  usuarios:Array<Usuarios> = [];

  constructor(
    private negocioService: NegociosService,
    private usuarioService: UsuariosService,
    private matDialog:MatDialog
  ){
    this.trearUsuarios();
    this.trearNegocios();
  }

  trearUsuarios(){
    this.usuarioService.getUsuarios().subscribe((response:any)=>{
      this.usuarios = response;
      
    });
  }
  trearNegocios(){
    this.negocioService.getNegocios().subscribe((response:any)=>{
      this.negocios = response;
    });
  }

  //Delete for Users
  deleteDialogUser(id:any,name:any){
    let dialogRef = this.matDialog.open(DeleteUserDialogComponent,
      {
        data:{
          id:id,
          name:name
        }
      });
    dialogRef.afterClosed().subscribe(
      result=>{console.log("se cerro el dialog Delete");
      }
    );
  }

  //Delete for Businesses
  deleteDialogBusiness(id:any,name:any){
    let dialogRef = this.matDialog.open(DeleteBusinessDialogComponent,
      {
        data:{
          id:id,
          name:name
        }
      });
    dialogRef.afterClosed().subscribe(
      result=>{console.log("se cerro el dialog Delete");
      }
    );
  }

}
