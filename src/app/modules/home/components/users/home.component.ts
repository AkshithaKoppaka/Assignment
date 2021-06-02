
import { Component, OnInit, Output, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/User';
import { UsersService } from '../../../../modules/home/services/users/users.service';
import { EventEmitter } from '@angular/core';
import { LoginService } from '../../../login/service/login.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'; 
import { MessageService } from '../../services/messages/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @Output() public edit = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  ELEMENT_DATA : User[];
  displayedColumns: string[] = ['id','name','username','email','street','suite','city','zipcode','latitude','longitude','phone','website','companyName', 'catchPhrase','bs','Edit'];
  dataSource;
  page: number = 1;
  isLoading=true;
  
  constructor(private messageService: MessageService, public router: Router, private service: UsersService, private login: LoginService) { 
    
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
    this.getAllUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  
  public getAllUsers(){
    let resp = this.service.getUsers();
    resp.subscribe(users=>{this.dataSource.data=users as User[]; this.isLoading=false;});
  }

  // LogoutUser(){
  //   localStorage.clear();
  //   this.router.navigate([""]);
  //   this.login.isLoggedIn=false;
  // }

  addUser(value1)
  {    
    this.router.navigateByUrl('/editUser', { state: { userData: value1 } });
  }

  editData(value) {
    this.edit.emit(this.ELEMENT_DATA);
    this.router.navigateByUrl('/editUser', { state: { userData: value } });
  }
  
  sendMessage(message){
    this.messageService.sendMessage(message);
    return false;
  }
}
