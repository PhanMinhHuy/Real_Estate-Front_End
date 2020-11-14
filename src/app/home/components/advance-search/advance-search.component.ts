import { Direction } from './../../../models/direction';
import { PostType } from './../../../models/post-type';
import { Region } from './../../../models/region';
import { Category } from './../../../models/category';
import { DirectionService } from './../../../services/direction.service';
import { PostTypeService } from './../../../services/post-type.service';
import { RegionService } from './../../../services/region.service';
import { CategoryService } from './../../../services/category.service';
import { SearchService } from './../../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss'],
})
export class AdvanceSearchComponent implements OnInit {
  categories: Category[] = [];
  regions: Region[] = [];
  postTypes: PostType[] = [];
  directions: Direction[] = [];
  searchForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private categoryService: CategoryService,
    private regionService: RegionService,
    private postTypeService: PostTypeService,
    private directionService: DirectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.regionService.getRegions().subscribe(
      (next) => {
        this.regions = next;
      },
      (err) => {
        location.assign('/error');
      }
    );
    this.categoryService.getCategories().subscribe(
      (next) => {
        this.categories = next;
      },
      (err) => {
        location.assign('/error');
      }
    );
    this.postTypeService.getPostTypes().subscribe(
      (next) => {
        this.postTypes = next;
      },
      (err) => {
        location.assign('/error');
      }
    );
    this.directionService.getDirections().subscribe(
      (next) => {
        this.directions = next;
      },
      (err) => {
        location.assign('/error');
      }
    );
    this.searchForm = this.formBuilder.group({
      categoryId: [null],
      regionId: [null],
      postTypeId: [null],
      condition: [null],
      area: [null],
      price: [null],
      deal: [true],
      directionId: [null],
      customerType: [null],
    });
  }

  handleSearch() {
    this.searchService.searchAll(this.searchForm.value);
    this.router.navigateByUrl('/');
  }
}
