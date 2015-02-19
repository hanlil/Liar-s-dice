/* 
*  Dice simulator with a very simple GUI
*
*  Written by Hanna Lilja, 2015-02-19
*/

import javax.swing.*;
import java.util.*;
import java.awt.*;
import java.awt.event.*;

public class DiceRoller extends JFrame implements ActionListener{

	//Dice memory
	int numberOfDice = 5;
	int[] theDice = new int[numberOfDice];

	//GUI elements
	private JButton rollButton = new JButton("Roll the dice");
	private JLabel diceResults = new JLabel("Hit the button");

	private void createGUI(){
		setSize(220, 110);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		JPanel p = new JPanel();
		p.setLayout(new BoxLayout(p, BoxLayout.Y_AXIS));
		diceResults.setFont(new Font("Serif", Font.PLAIN, 30));
		p.add(diceResults);
		rollButton.addActionListener(this);
		p.add(rollButton);
		rollButton.setAlignmentX(Component.CENTER_ALIGNMENT);
		diceResults.setAlignmentX(Component.CENTER_ALIGNMENT);
		add(p);
		setVisible(true);
	}

	private void rollDice(){
		String newString = " " + " ";
		for (int i = 0; i < numberOfDice; i += 1){
			Random rand = new Random();
			int res = rand.nextInt(6) + 1;
			theDice[i] = res;
			newString += res + " " + " ";
		}
		diceResults.setText(newString);
	}

	public void actionPerformed(ActionEvent e) {
		rollDice();
	}

	public static void main(String[] args){
		DiceRoller dr = new DiceRoller();
		dr.createGUI();
	}
}
