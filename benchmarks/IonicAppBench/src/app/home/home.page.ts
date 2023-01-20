import { Component , OnInit } from '@angular/core';

import { StorageService } from '../services/local/storage.service';
import { HttpService } from '../services/remote/http.service';

import mandelbrot from '../benchmarks/mandelbrot';
import binarytree from '../benchmarks/binarytree';
import fasta from '../benchmarks/fasta';
import nbody from '../benchmarks/nbody';
import pidigits from '../benchmarks/pidigits';
import spectral from '../benchmarks/spectral';
import fann from '../benchmarks/fannkuch';
import knucleotide from '../benchmarks/knucleotide';
import regex from '../benchmarks/regex';
import revComp from '../benchmarks/revcomp';

import { Program } from '../benchmarks/programs'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private fileText: string;

  constructor(private storage: StorageService, private http: HttpService) {}

  async ngOnInit() {

    const response = await this.http.what_now();
    const programList = response.split("-");
    const program = this.mapProgram(programList[0])
    await this.runProgram(program, parseInt(programList[1]), this.storage.writeText);
    
    await this.http.log_data();
    await this.storage.deleteFile();
    this.http.done();

  }

  private async runProgram(program: Program, parameter: Number, writer){   
    switch(program){
      case Program.binarytree:
        await binarytree(parameter, writer);
        break;
      case Program.fannkuch:
        await fann(parameter, writer);
        break;
      case Program.fasta:
        await fasta(parameter, writer);
        break;
      case Program.nbody:
        await nbody(parameter, writer);
        break;
      case Program.pidigits:
        await pidigits(parameter, writer);
        break;
      case Program.mandelbrot:
        await mandelbrot(parameter, writer);
        break;
      case Program.spectral:
        await spectral(parameter, writer);
        break;
      case Program.knucleotide:
        this.fileText = await this.storage.getFileFromAssets(parameter);
        await knucleotide(this.fileText, writer);
        break;
      case Program.regex:
        this.fileText = await this.storage.getFileFromAssets(parameter);
        await regex(this.fileText, writer);
        break;
      case Program.revcomp:
        this.fileText = await this.storage.getFileFromAssets(parameter);
        await revComp(this.fileText, writer);
        break;
    }
  }

  private mapProgram(text) {
    switch (text) {
      case "binarytree":        
        return Program.binarytree;
      case "fannkuch":
        return Program.fannkuch;
      case "fasta":
        return Program.fasta;
      case "knucleotide":
        return Program.knucleotide;
      case "nbody":
        return Program.nbody;
      case "regex":
        return Program.regex;
      case "revcomp":
        return Program.revcomp;
      case "spectral":
        return Program.spectral;
      case "pidigits":
        return Program.pidigits;
      case "mandelbrot":
        return Program.mandelbrot;
      default:
        return;
    }
  }

}
