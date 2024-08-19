using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace WrenchApp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            Mainframe.Source = new Uri("Pages/HomePage.xaml", UriKind.Relative);
        }

        private void Minimize_Screen(object sender, EventArgs e)
        {
            this.WindowState = WindowState.Minimized;
        }

        private void Resize_Screen(object sender, EventArgs e)
        {
            if (this.WindowState == WindowState.Maximized)
            {
                this.WindowState = WindowState.Normal;
            } else
            {
                this.WindowState = WindowState.Maximized;
            }
        }

        private void Close_Screen(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Border_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left)
            {
                this.WindowState = WindowState.Normal;
                this.DragMove();
            }
        }

        private void Home_Screen(object sender, EventArgs e)
        {
            Mainframe.Source = new Uri("Pages/HomePage.xaml", UriKind.Relative);
        }

        private void Categories_Screen(object sender, EventArgs e)
        {
            Mainframe.Source = new Uri("Pages/CategoriesPage.xaml", UriKind.Relative);
        }

        private void Library_Screen(object sender, EventArgs e)
        {
            Mainframe.Source = new Uri("Pages/LibraryPage.xaml", UriKind.Relative);
        }
    }
}
