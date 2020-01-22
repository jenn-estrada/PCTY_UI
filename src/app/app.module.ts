import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  imports:      [ 
    BrowserModule, 
    HttpClientModule,
    ApolloModule,
    HttpLinkModule, 
    FlexLayoutModule, 
    FormsModule, 
    ReactiveFormsModule, 
    AngularMaterialModule, 
    GraphQLModule
  ],
  declarations: [ AppComponent, CalculatorComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
