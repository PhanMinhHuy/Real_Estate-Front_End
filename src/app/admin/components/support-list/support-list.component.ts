import {Component, OnInit} from '@angular/core';
import {ReasonService} from '../../../services/reason.service';
import {Reason} from '../../../models/reason';
import {SupportService} from '../../../services/support.service';
import {Support} from '../../../models/support';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PagerService} from '../../../services/pager.service';

@Component({
  selector: 'app-support-list',
  templateUrl: './support-list.component.html',
  styleUrls: ['./support-list.component.scss']
})
export class SupportListComponent implements OnInit {
  reasons: Reason[];
  supports: Support[];
  support: Support;
  supportId: number;
  reasonId: number;
  page = 0;
  pages: number[];
  totalPages: number;
  first: boolean;
  last: boolean;
  clicked = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private reasonService: ReasonService,
    private supportService: SupportService
  ) {
  }

  ngOnInit(): void {
    this.getReasons();
    this.getSupports();
  }

  getReasons() {
    this.reasonService.getReasons().subscribe(data => {
      this.reasons = data;
    });
  }

  openModal(targetModal, support) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.support = support;
    this.support.checked = true;
    this.supportService.editSupport(this.support).subscribe();
  }

  getSupports() {
    // @ts-ignore
    this.reasonId = document.getElementById('selectReasonId').value;

    this.supportService.getSupportsByReasonId(this.reasonId, this.page).subscribe(data => {
      // @ts-ignore
      this.supports = data.content;
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

  setPage(page, event: any) {
    event.preventDefault();
    this.page = page;
    this.getSupports();
  }
}
