import { Component, OnDestroy, OnInit, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { distinctUntilChanged, takeUntil, map } from "rxjs/operators";

import { UserDetailUseCase } from '../../usecase/user-detail.usecase';

@Component({
  templateUrl: "./user-detail-page.component.html",
  styleUrls: ["./user-detail-page.component.css"],
})

export class UserDetailPageComponent implements OnInit, OnDestroy {
  user$ = this.userDetailUseCase.user$;

  private onDestroy$ = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private userDetailsUseCase: UserDetailUseCase
  ) {}


  ngOnInit() {
    this.route.params
    .pipe(
      takeUntil(this.onDestroy$),
      map(params => params["userId"]),
      distinctUntilChanged()
    )
    .subscribe(userId => this.userDetailsUseCase.fetchUser(userId));
  }

  ngOnDestroy() {
    this.onDestroy$.complete();
  }
}
