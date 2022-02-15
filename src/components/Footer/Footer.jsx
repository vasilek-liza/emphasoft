import { resources } from '../../resources';
import './Footer.scss';

export function Footer() {

   let date = new Date().getFullYear();

   return (
      <footer className="footer">
         <div className="footer__wrapper">
            <p className="footer__copyright">
               {date} &copy; / {resources.footerTitle}
            </p>
         </div>
      </footer> 
   );
}
