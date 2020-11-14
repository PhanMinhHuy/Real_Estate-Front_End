import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../models/category';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../../services/category.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[];
  categoryForm: FormGroup;
  page = 0;
  pages: number[];
  totalPages: number;
  first: boolean;
  last: boolean;
  duplicated = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.getCategories();

    this.categoryForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]]
    });
  }

  getCategories() {
    this.categoryService.getCategoriesPages(this.page).subscribe(data => {
      this.categories = data.content;
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

  onSubmitCategoryForm() {
    if (this.categoryForm.invalid) {
      return;
    }
    if (this.categoryForm.value.id) {
      this.categoryService.editCategory(this.categoryForm.value).subscribe(data => {
        this.categories.unshift(data);
      }, () => {
        this.duplicated = true;
      });
    } else {
      this.categoryService.createCategory(this.categoryForm.value).subscribe(data => {
        this.categories.unshift(data);
      }, () => {
        this.duplicated = true;
      });
    }
  }

  updateCategory(id: number) {
    this.categoryService.getCategoryById(id).subscribe(data => {
      this.categoryForm.patchValue(data);
    });
  }

  deleteCategory(id: number) {
    if (confirm(`Bạn có muốn xóa danh mục có mã là ${id} không?`)) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.categories = this.categories.filter(c => c.id !== id);
        alert(`Bạn đã xóa danh mục có mã là ${id} thành công!`);
      }, () => {
        alert(`Bạn không thể xóa danh mục có mã là ${id}!`);
      });
    }
  }

  setPage(page, event: any) {
    event.preventDefault();
    this.page = page;
    this.getCategories();
  }
}
