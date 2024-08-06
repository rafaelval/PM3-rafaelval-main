interface IAppoinmentDto {
      date: string;
      time: string;
      userId: number;
      status: 'active' | 'cancelled';
    }
    
    
    export default IAppoinmentDto