import {Component, OnInit} from '@angular/core';
import {PostType} from '../../../../models/post-type';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostTypeService} from '../../../../services/post-type.service';

@Component({
  selector: 'app-post-type-management',
  templateUrl: './post-type-management.component.html',
  styleUrls: ['./post-type-management.component.scss']
})
export class PostTypeManagementComponent implements OnInit {
  postTypes: PostType[];
  postTypeForm: FormGroup;
  page = 0;
  pages: number[];
  totalPages: number;
  first: boolean;
  last: boolean;
  duplicated = false;

  constructor(
    private formBuilder: FormBuilder,
    private postTypeService: PostTypeService
  ) {
  }

  ngOnInit(): void {
    this.getPostTypes();

    this.postTypeForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]]
    });
  }

  getPostTypes() {
    this.postTypeService.getPostTypesPages(this.page).subscribe(data => {
      this.postTypes = data.content;
      // @ts-ignore
      this.first = data.first;
      // @ts-ignore
      this.last = data.last;
      // @ts-ignore
      this.pages = new Array(data.totalPages);
      // @ts-ignore
      this.totalPages = data.totalPages;
    });
  }

  onSubmitPostTypeForm() {
    if (this.postTypeForm.valid) {
      if (this.postTypeForm.value.id) {
        this.postTypeService.editPostType(this.postTypeForm.value).subscribe(data => {
          this.postTypes.unshift(data);
        }, () => {
          this.duplicated = true;
        });
      } else {
        this.postTypeService.createPostType(this.postTypeForm.value).subscribe(data => {
          this.postTypes.unshift(data);
        }, () => {
          this.duplicated = true;
        });
      }
    }
  }

  updatePostType(id: number) {
    this.postTypeService.getPostTypeById(id).subscribe(data => {
      this.postTypeForm.patchValue(data);
    });
  }

  deletePostType(id: number) {
    if (confirm(`Bạn có muốn xóa loại bài đăng có mã là ${id} không?`)) {
      this.postTypeService.deletePostType(id).subscribe(() => {
        this.postTypes = this.postTypes.filter(pt => pt.id !== id);
        alert(`Bạn đã xóa loại bài đăng có mã là ${id} thành công!`);
      }, () => {
        alert(`Bạn không thể xóa loại bài đăng có mã là ${id}!`);
      });
    }
  }

  setPage(page, event: any) {
    event.preventDefault();
    this.page = page;
    this.getPostTypes();
  }
}
