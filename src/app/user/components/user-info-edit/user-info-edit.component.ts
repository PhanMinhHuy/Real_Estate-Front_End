import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info-edit',
  templateUrl: './user-info-edit.component.html',
  styleUrls: ['./user-info-edit.component.scss'],
})
export class UserInfoEditComponent implements OnInit {
  infoEditForm: FormGroup;
  userId: number;
  user: User;
  selectedFile: File = null;
  imageUrl = '';
  fileRef;
  task;
  uploadPercent;

  constructor(
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.infoEditForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^0[1-9]{2}[0-9]{7}$')],
      ],
      email: [''],
      avatar: [''],
      status: [''],
      activated: [''],
      role: [''],
      createdAt: [''],
      updatedAt: [''],
      posts: [''],
    });

    this.getUserById();
  }

  getUserById() {
    this.userId = this.tokenStorageService.getUser().id;
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
      this.infoEditForm.patchValue(this.user);
    });
  }

  detectFile(event) {
    this.selectedFile = event.target.files[0];

    // Show image preview
    const reader = new FileReader();
    reader.onload = (data: any) => {
      this.imageUrl = data.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  uploadFile() {
    const myTest = this.angularFirestore.collection('test').ref.doc();
    console.log(myTest.id);

    const file = this.selectedFile;
    const filePath = `${myTest.id}`;
    this.fileRef = this.angularFireStorage.ref(filePath);
    this.task = this.angularFireStorage.upload(filePath, file);

    this.uploadPercent = this.task.percentageChanges();
  }

  onSubmit() {
    if (this.infoEditForm.valid) {
      if (this.selectedFile) {
        this.uploadFile();
        this.task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.fileRef
                .getDownloadURL()
                .toPromise()
                .then((url) => {
                  this.infoEditForm.value.avatar = url;
                  this.userService
                    .editUser(this.infoEditForm.value)
                    .subscribe((data) => {
                      this.router.navigateByUrl('/user');
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
          )
          .subscribe();
      } else {
        this.userService.editUser(this.infoEditForm.value).subscribe((data) => {
          this.router.navigateByUrl('/user');
        });
      }
    }
  }
}
