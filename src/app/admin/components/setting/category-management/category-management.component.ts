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
  page: number;

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
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmitCategoryForm() {
    if (this.categoryForm.valid) {
      if (this.categoryForm.value.id) {
        this.categoryService.editCategory(this.categoryForm.value).subscribe(data => {
          location.reload();
        });
      } else {
        this.categoryService.createCategory(this.categoryForm.value).subscribe(data => {
          location.reload();
        });
      }
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
        alert(`Bạn đã xóa danh mục có mã là ${id} thành công!`);
      }, () => {
        alert(`Bạn không thể xóa danh mục có mã là ${id}!`);
      });
    }
  }

}
