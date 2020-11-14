import { Component, OnInit } from '@angular/core';
import {Region} from '../../../../models/region';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegionService} from '../../../../services/region.service';

@Component({
  selector: 'app-region-management',
  templateUrl: './region-management.component.html',
  styleUrls: ['./region-management.component.scss']
})
export class RegionManagementComponent implements OnInit {
  regions: Region[];
  regionForm: FormGroup;
  page = 0;
  pages: number[];
  totalPages: number;
  first: boolean;
  last: boolean;
  duplicated = false;

  constructor(
    private regionService: RegionService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getRegions();

    this.regionForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]]
    });
  }

  getRegions() {
    this.regionService.getRegionsPages(this.page).subscribe(data => {
      this.regions = data.content;
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

  onSubmitRegionForm() {
    if (this.regionForm.valid) {
      if (this.regionForm.value.id) {
        this.regionService.editRegion(this.regionForm.value).subscribe(data => {
          this.regions.unshift(data);
        }, () => {
          this.duplicated = true;
        });
      } else {
        this.regionService.createRegion(this.regionForm.value).subscribe(data => {
          this.regions.unshift(data);
        }, () => {
          this.duplicated = true;
        });
      }
    }
  }

  updateRegion(id: number) {
    this.regionService.getRegionById(id).subscribe(data => {
      this.regionForm.patchValue(data);
    });
  }

  deleteRegion(id: number) {
    if (confirm(`Bạn có muốn xóa vùng miền có mã là ${id} không?`)) {
      this.regionService.deleteRegion(id).subscribe(() => {
        this.regions = this.regions.filter(r => r.id !== id);
        alert(`Bạn đã xóa vùng miền có mã là ${id} thành công!`);
      }, () => {
        alert(`Bạn không thể xóa vùng miền có mã là ${id}!`);
      });
    }
  }

  setPage(page, event: any) {
    event.preventDefault();
    this.page = page;
    this.getRegions();
  }
}
