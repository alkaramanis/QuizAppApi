enum difficulty {
  easy = 'Easy',
  medium = 'Medium',
  difficult = 'difficult',
}
export class Tour {
  public name!: string;
  public ratingsAverage: number;
  public difficulty: difficulty;
  public ratingsQuantity: number;
  public price!: number;
  public summary!: string;
  public description: string;
  public imageCover!: string;
  public id!: string;
  public idArr: string[];

  findId(name: string, TourArr: Tour[]) {
    TourArr.forEach((tour: Tour) => {
      if (tour.name.includes(name)) {
        this.idArr.push(tour.id);
      }
    });
    console.log(this.idArr);
  }
}
