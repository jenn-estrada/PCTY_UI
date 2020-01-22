import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EmpQuery, EmpVariables, DepQuery, DepVariables } from './types';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})


export class CalculatorComponent implements OnInit {
  form: FormGroup;
  showCost: boolean = false;
  myRegEx = /^[a-zA-Z][a-zA-Z\s.-]*$/
  //apollo observs
  empVal$: Observable<number>;
  empRef$: QueryRef<EmpQuery, EmpVariables>;
  depVal$: Observable<number>;
  depRef$: QueryRef<DepQuery, DepVariables>;
  //labels
  totalCost$: Observable<number>;
  yearlyNet$: Observable<number>;

  constructor(private builder: FormBuilder, private apollo: Apollo) {
  }

  ngOnInit() {
    this.form = this.builder.group({
      employeeName: ['', [Validators.pattern(this.myRegEx)]],
      dependents: this.builder.array([])
    })

    this.empRef$ = this.apollo.watchQuery<EmpQuery, EmpVariables>({
      query: gql`
        query costEmp($name: String) {
          costEmp(name: $name)
        }
      `
    });
    this.empVal$ = this.empRef$.valueChanges.pipe(map(result => result.data.costEmp));

    this.depRef$ = this.apollo.watchQuery<DepQuery, DepVariables>({
      query: gql`
        query costDep($names: [String]) {
          costDep(names: $names)
        }
      `
    });
    this.depVal$ = this.depRef$.valueChanges.pipe(map(result => result.data.costDep));

    this.totalCost$ = combineLatest(this.depVal$, this.empVal$, ((emp, dep) => emp + dep));
    this.yearlyNet$ = combineLatest(this.depVal$, this.empVal$, ((emp, dep) => 5000 - (emp + dep)));

    this.onChanges();
  }

  get dependentForms() {
    return this.form.get('dependents') as FormArray
  }

  addDependent() {
    const dependent = this.builder.group({
      dependentName: ['', [Validators.pattern(this.myRegEx)]]
    })
    this.dependentForms.push(dependent);
    this.updateDependentList();
  }

  deleteDependent() {
    this.dependentForms.removeAt(0);
    this.updateDependentList();
  }

  updateDependentList() {
    let dependents = this.dependentForms.value.map( (d: { dependentName: string; }) => { return d.dependentName});
    this.depRef$.setVariables({
      names: dependents ? dependents : []
    });
  }

  onChanges() {
    this.form.valueChanges.subscribe(val => {
      // employee name cannot be empty string
      if(!(this.myRegEx.test(val.employeeName))) {
        this.showCost = false;
        return;
      }

      this.empRef$.setVariables({
        name: val.employeeName
      });

      this.updateDependentList();
      this.showCost = true;
    });
  }
}