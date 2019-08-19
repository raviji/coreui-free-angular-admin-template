import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule,
  MatSliderModule,
  MatDialogModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSelectModule,
  MatChipsModule,
  MatBadgeModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatNativeDateModule
  } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    MatChipsModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    MatChipsModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule
  ]
})
export class SharedModule {
    constructor() {}
}
