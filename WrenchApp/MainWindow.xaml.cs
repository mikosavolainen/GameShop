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
using System.Windows.Navigation;
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
        }

        private void Close_Screen(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Border_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left)
            {
                this.DragMove();
            }
        }

        private void Log_In(object sender, EventArgs e)
        {
            string username = Username.Text;
            string password = Password.Password.ToString();

            MessageBox.Show($"Successfully logged in\nUsername: {username}\nPassword: {password}");
        }

        private void Forgot_Password(object sender, EventArgs e)
        {
            MessageBox.Show("Too bad :(", "");
        }

        private void Register(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Servers down or smthn", "Error code 1-600");
        }
    }
}
